# AI Coding Tip 001 - Commit Before Prompt

![AI Coding Tip 001 - Commit Before Prompt](AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt.jpg)

*A safety-first workflow for AI-assisted coding*

> TL;DR: Commit your code before asking an AI Assistant to change it.

# Common Mistake ❌

Developers ask AI assistants to "refactor this function" or "add error handling" while they have uncommitted changes from their previous work session. 

When the AI makes its changes, the git diff shows everything mixed together, their manual edits plus the AI's modifications. 

If something breaks, they can't easily separate what they did from what the AI did and make a safe revert.

# Problems Addressed 😔

- You mix your previous code changes with AI-generated code. 

- You lose track of what you changed.

- You struggle to revert broken suggestions.

# How to Do It 🛠️

1. Finish your manual task.

2. Run your tests to ensure everything passes.

3. Commit your work with a clear message like *feat: manual implementation of X*.

4. You don't need to push your changes. 

5. Send your prompt to the AI assistant.

6. Review the changes using your IDE's diff tool.

7. **Accept or revert**: Keep the changes if they look good, or run `git reset --hard HEAD` to instantly revert

8. Run the tests again to verify AI changes didn't break anything.

9. Commit AI changes separately with a message like *refactor: AI-assisted improvement of X*.

# Benefits 🎯

Clear Diffing: You see the AI's "suggestions" in isolation.

Easy Revert: You can undo a bad AI hallucination instantly.

Context Control: You ensure the AI is working on your latest, stable logic.

Tests are always green: You are not breaking existing functionality.

# Context 🧠

When you ask an AI to change your code, it might produce unexpected results. 

It might delete a crucial logic gate or change a variable name across several files. 

If you have uncommitted changes, you can't easily see what the AI did versus what you did manually.

When you commit first, you create a safety net. 

You can use `git diff` to see exactly what the AI modified. 

If the AI breaks your logic, you can revert to your clean state with one command.

You work in [very small increments](https://www.davefarley.net/?p=202).

Some assistants are not very good at **undoing** their changes.

## Prompt Reference 📝

<!-- [Gist Url](https://gist.github.com/mcsee/c24d054bacdcbb523b50e909ce906c01) -->

```bash
git status              # Check for uncommitted changes

git add .               # Stage all changes

git commit -m "msg"     # Commit with message

git diff                # See AI's changes

git reset --hard HEAD   # Revert AI changes

git log --oneline       # View commit history
```

# Considerations ⚠️

This is only necessary if you work in *write mode* and your assistant is allowed to change the code.

# Type 📝

[X] Semi-Automatic

You can enforce the rules of your assistant to check the repository status before making changes.

# Limitations ⚠️

If your code is not under a source control system, you need to make this manually.

# Tags 🏷️

- Complexity

# Level 🔋

[X] Beginner

# Related Tips 🔗

- Use [TCR](https://www.infoq.com/articles/test-commit-revert/)

- Practice Vibe Test Driven Development

- Break Large Refactorings into smaller prompts

- Use [Git Bisect](https://learning.oreilly.com/library/view/clean-code-cookbook/9781098144715/ch08.html) for AI Changes: Using `git bisect` to identify which AI-assisted commit introduced a defect

- Reverting Hallucinations

# Conclusion 🏁

Treating AI as a pair programmer requires the same safety practices you'd use with a human collaborator: version control, code review, and testing.

When you commit before making a prompt, you create clear checkpoints that make AI-assisted development safer and more productive.

This simple habit transforms AI from a risky black box into a powerful tool you can experiment with confidently, knowing you can always return to a working state.

Commit early, commit often, and don't let AI touch uncommitted code.

# More Information ℹ️

[Explain in 5 Levels of Difficulty: GIT](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Explain%20in%205%20Levels/Explain%20in%205%20Levels%20of%20Difficulty%20GIT/readme.md)

[TCR](https://www.infoq.com/articles/test-commit-revert/)

[Kent Beck on TCR](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864)

# Also Known As 🎭

- Commit Before Prompt

# Tools 🧰

[GIT](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Explain%20in%205%20Levels/Explain%20in%205%20Levels%20of%20Difficulty%20GIT/readme.md) is an industry standard, but you can apply this technique to any other version control software.

# Disclaimer 📢

The views expressed here are my own. 

I welcome constructive criticism and dialogue. 

These insights are shaped by 30 years in the software industry, 25 years of teaching, and authoring over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.