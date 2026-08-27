"""
Export and Push Fine-Tuned Model to Hugging Face Hub & GGUF
"""

import argparse
import os

def export_and_push(adapter_dir="./output_model", hf_repo="SHIKARI2/coded-qwen2.5-coder-7b", hf_token=None, export_gguf=True):
    print(f"Exporting model from {adapter_dir} to Hugging Face: {hf_repo}...")
    
    if hf_token:
        os.environ["HF_TOKEN"] = hf_token
        from huggingface_hub import login
        login(token=hf_token)

    try:
        from unsloth import FastLanguageModel
        
        print("Loading fine-tuned model for export...")
        model, tokenizer = FastLanguageModel.from_pretrained(
            model_name=adapter_dir,
            max_seq_length=4096,
            load_in_4bit=True
        )

        # 1. Push LoRA Adapter to Hub
        print(f"Pushing LoRA adapter to {hf_repo}-lora...")
        model.push_to_hub_merged(
            f"{hf_repo}-lora",
            tokenizer,
            save_method="lora",
            token=hf_token
        )

        # 2. Push 16-bit Full Merged Weights
        print(f"Pushing full 16-bit merged model to {hf_repo}...")
        model.push_to_hub_merged(
            hf_repo,
            tokenizer,
            save_method="merged_16bit",
            token=hf_token
        )

        # 3. Export GGUF for Ollama / vLLM
        if export_gguf:
            print(f"Exporting GGUF q4_k_m to {hf_repo}-gguf...")
            model.push_to_hub_gguf(
                f"{hf_repo}-gguf",
                tokenizer,
                quantization_method="q4_k_m",
                token=hf_token
            )

        print("Model export and upload complete!")
    except Exception as e:
        print(f"Error during export: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--adapter_dir", default="./output_model")
    parser.add_argument("--repo_id", default="SHIKARI2/coded-qwen2.5-coder-7b")
    parser.add_argument("--hf_token", required=False, default=None)
    parser.add_argument("--gguf", action="store_true", default=True)
    args = parser.parse_args()

    export_and_push(
        adapter_dir=args.adapter_dir,
        hf_repo=args.repo_id,
        hf_token=args.hf_token,
        export_gguf=args.gguf
    )
