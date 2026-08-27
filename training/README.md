# CODED-Agent: Fine-Tuning Pipeline for Autonomous Multi-File Coding AI

Autonomous AI Coding Agent model fine-tuned on **Qwen2.5-Coder-7B-Instruct** (or **Llama-3.1-8B-Instruct**) with Unsloth QLoRA. Trained to generate complete multi-file software projects, directory trees, and production-ready React/TypeScript/Node.js files.

---

## ⚡ Features
- 🚀 **Multi-File Project Synthesis**: Outputs complete repositories with directory structures, dependencies, and code.
- 🏎️ **Unsloth Fast QLoRA**: 2-5x faster training, 80% VRAM savings. Trains on a single **16GB–24GB GPU** (or free Google Colab T4/A100).
- 📦 **One-Click Export**: Save LoRA adapter, merge 16-bit float weights, and export 4-bit / 8-bit GGUF for Ollama & vLLM.
- 🌐 **Hugging Face Push**: Automatic model card generation and push to `SHIKARI2/coded-qwen2.5-coder-7b`.

---

## 📂 Repository Structure

```
training/
├── train.py              # Main Unsloth fine-tuning script with QLoRA & SFTTrainer
├── dataset_generator.py  # Pipeline to generate multi-file coding training pairs
├── dataset.jsonl         # Sample curated training dataset in ChatML format
├── export_hf.py          # Script to merge weights, export GGUF, and upload to Hugging Face
├── requirements.txt      # PyTorch, Unsloth, Transformers, TRL, PEFT, Datasets
└── README.md             # Complete step-by-step training guide
```

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Generate / Expand Dataset
```bash
python dataset_generator.py
```

### 3. Start Fine-Tuning
```bash
python train.py --model_name "Qwen/Qwen2.5-Coder-7B-Instruct" --epochs 3 --batch_size 2
```

### 4. Export & Push to Hugging Face
```bash
python export_hf.py --hf_token "your_hf_token" --repo_id "SHIKARI2/coded-qwen2.5-coder-7b"
```
