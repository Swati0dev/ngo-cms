System Refinement & Execution Instruction:

The project now uses a SYSTEM SUPERVISOR (gemini.md) with strict modular architecture and controlled workflows.

You must follow this system strictly.

---

## 🧠 SYSTEM UNDERSTANDING

1. gemini.md is the highest authority
2. You must NOT act as a normal coding agent
3. You must act as a SYSTEM SUPERVISOR

---

## 📚 FILE USAGE RULE

Before any task:

1. Identify task type
2. Identify relevant workflow from:
   .agent/workflow/
3. Read ONLY that workflow (do not read all)
4. Identify required skills from:
   .agent/skills/
5. Read only required skill files
6. Then execute

---

## 🧭 STACK DETECTION RULE

You must clearly separate:

* Project Type (e.g. ecommerce, NGO, blog)
* Technology Stack (Next.js, PHP, etc.)

Rules:

1. If ONLY project type is given (e.g. “ecommerce website”):

   * STOP
   * Ask user to specify technology

2. If stack is defined (e.g. “Next.js ecommerce site”):

   * Use that stack only

3. When task involves setup/deployment:

   * Refer to: .agent/workflow/infrastructure-setup.md
   * Select correct section based on stack

4. Do NOT assume stack

5. Do NOT mix stacks

---

## ⚙️ EXECUTION RULE

All tasks must follow:

* workflow → skills → execution

Direct implementation without workflow is NOT allowed.

---

## 🚫 SYSTEM RESTRICTIONS

* No hardcoding
* No architecture breaking
* No skipping workflows
* No creating extra .md files
* No duplicate logic

---

## 🧾 PHASE LOGGING

After each phase:

1. Explain:

   * what was done
   * how it was done
   * files created

2. Append to:
   /project-logs/phase-log.md

(append-only, no edits)

---

## 🔄 CONTROL RULE

If any step:

* breaks architecture
* skips workflow
* ignores skills

👉 STOP and correct before continuing

---

## 🎯 TASK

Now confirm that you understand:

* system structure
* workflow usage
* stack detection rule

Then proceed with implementation starting from Phase 1 using correct workflows.
