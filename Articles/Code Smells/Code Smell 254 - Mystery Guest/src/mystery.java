@Test
void shouldReturnAnswerWhenAnswerExists() {
    User answer = KnowledgeRepository.findAnswerToQuestion(42);
    assertNotNull(answer);
}
