class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, task, priority):
        self.tasks.append((task, priority))

    def execute_tasks(self):
        # No sorting

        for task, _ in self.tasks:
            task.execute()

class Task:
    def __init__(self, name):
        self.name = name

    def execute(self):
        print(f"Executing task: {self.name}")

task_manager = TaskManager()
highPriorityTask = Task("Slow down")
mediumPriorityTask = Task("Take Photos")
reviveKlaatu = Task("Klaatu barada nikto")

# unsorted
task_manager.add_task(mediumPriorityTask, 2)
task_manager.add_task(highPriorityTask, 1)
task_manager.add_task(reviveKlaatu, 3)

task_manager.execute_tasks()