struct Task {
    subtasks: Vec<Subtask>,
}

impl Task {
    fn add_subtask(&mut self, subtask: Subtask) {
        self.subtasks.push(subtask);
    }
}
