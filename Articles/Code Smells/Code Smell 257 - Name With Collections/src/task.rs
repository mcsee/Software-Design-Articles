struct Task {
    collection_of_subtasks: Vec<Subtask>,
    subtasks_collection: Vec<Subtask>,
}

impl Task {
    fn add_subtask(&mut self, subtask: Subtask) {
        self.collection_of_subtasks.push(subtask);
        self.subtasks_collection.push(subtask);
    }
}