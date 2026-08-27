"""
Fine-tuning script for DeepSeek-R1-Distill-Qwen-32B — Malvos by Malvos Lab.
Optimized for Google Colab Pro A100 80GB with Unsloth QLoRA.
- Model: deepseek-ai/DeepSeek-R1-Distill-Qwen-32B
- VRAM: ~55-65 GB in 4-bit (fits A100 80GB)
- LoRA rank: 64 (up from 16) for stronger fine-tune signal on large model
- Sequence length: 8192 training / 128k native inference
"""

import argparse
import os
import torch
from datasets import load_dataset
from trl import SFTTrainer
from transformers import TrainingArguments


def train(
    model_name="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    dataset_path="dataset.jsonl",
    output_dir="./malvos_32b_adapter",
    max_seq_length=8192,
    epochs=3,
    batch_size=2
):
    print(f"[Malvos Lab] Loading base model: {model_name}")
    print(f"[Malvos Lab] Sequence length: {max_seq_length} | Native inference: 128k")
    print(f"[Malvos Lab] Target GPU: A100 80GB (Colab Pro)")

    try:
        from unsloth import FastLanguageModel

        model, tokenizer = FastLanguageModel.from_pretrained(
            model_name=model_name,
            max_seq_length=max_seq_length,
            dtype=None,           # Auto-detect: bf16 on A100
            load_in_4bit=True,    # 4-bit NF4 quantization — fits 32B in ~55 GB VRAM
        )

        # LoRA rank 64 — significantly stronger fine-tune signal vs 7B's rank 16
        # lora_alpha = 2x rank is standard for large models
        model = FastLanguageModel.get_peft_model(
            model,
            r=64,
            lora_alpha=128,
            target_modules=[
                "q_proj", "k_proj", "v_proj", "o_proj",
                "gate_proj", "up_proj", "down_proj"
            ],
            lora_dropout=0,
            bias="none",
            use_gradient_checkpointing="unsloth",  # Saves ~30% VRAM
            random_state=3407,
            use_rslora=True,    # Rank-stabilized LoRA — better stability on 32B
            loftq_config=None,
        )

    except ImportError:
        print("[Malvos Lab] Unsloth not found, falling back to HF PEFT + BitsAndBytes...")
        from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
        from peft import LoraConfig, get_peft_model

        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16,  # bf16 on A100
            bnb_4bit_use_double_quant=True
        )

        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=bnb_config,
            device_map="auto"
        )

        peft_config = LoraConfig(
            r=64,
            lora_alpha=128,
            target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
            lora_dropout=0.05,
            bias="none",
            task_type="CAUSAL_LM"
        )
        model = get_peft_model(model, peft_config)

    # ── Dataset ───────────────────────────────────────────────────────────────
    print(f"[Malvos Lab] Loading dataset: {dataset_path}")
    dataset = load_dataset("json", data_files=dataset_path, split="train")

    def formatting_prompts_func(examples):
        convos = examples["messages"]
        texts = [
            tokenizer.apply_chat_template(convo, tokenize=False, add_generation_prompt=False)
            for convo in convos
        ]
        return {"text": texts}

    dataset = dataset.map(formatting_prompts_func, batched=True)
    print(f"[Malvos Lab] Dataset loaded: {len(dataset)} records")

    # ── Training Args — tuned for A100 80GB + 32B model ──────────────────────
    # batch_size=2, grad_accum=8 → effective batch = 16
    # Lower LR than 7B (1e-4 vs 2e-4) — large models need gentler updates
    training_args = TrainingArguments(
        output_dir=output_dir,
        per_device_train_batch_size=batch_size,
        gradient_accumulation_steps=8,          # Effective batch = 16
        warmup_steps=10,
        num_train_epochs=epochs,
        learning_rate=1e-4,                     # Lower LR for 32B stability
        fp16=False,
        bf16=True,                              # A100 natively supports bf16
        logging_steps=5,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        save_strategy="epoch",
        save_total_limit=2,
        seed=3407,
        report_to="none",
    )

    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=max_seq_length,
        dataset_num_proc=4,
        packing=True,                           # Pack short sequences → faster throughput
        args=training_args,
    )

    print("[Malvos Lab] Starting fine-tuning on DeepSeek-R1-Distill-Qwen-32B...")
    trainer_stats = trainer.train()

    print(f"\n[Malvos Lab] Training complete!")
    print(f"  Runtime    : {trainer_stats.metrics['train_runtime']:.0f}s")
    print(f"  Loss       : {trainer_stats.metrics['train_loss']:.4f}")
    print(f"  Samples/s  : {trainer_stats.metrics.get('train_samples_per_second', 'N/A')}")

    print(f"\n[Malvos Lab] Saving adapter to {output_dir}...")
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    print("[Malvos Lab] Adapter saved. Ready to merge or deploy with Ollama.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Malvos 32B Fine-Tuning Script")
    parser.add_argument("--model_name",     default="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B")
    parser.add_argument("--dataset",        default="dataset.jsonl")
    parser.add_argument("--output_dir",     default="./malvos_32b_adapter")
    parser.add_argument("--max_seq_length", type=int, default=8192)
    parser.add_argument("--epochs",         type=int, default=3)
    parser.add_argument("--batch_size",     type=int, default=2)
    args = parser.parse_args()

    train(
        model_name=args.model_name,
        dataset_path=args.dataset,
        output_dir=args.output_dir,
        max_seq_length=args.max_seq_length,
        epochs=args.epochs,
        batch_size=args.batch_size
    )
