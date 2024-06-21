@Test
void shouldReturnAnswerWhenAnswerExists() {
    KnowledgeRepository knowledgeRepository = 
        new InMemoryKnowledgeRepository();
    Answer expectedAnswer = new Answer(42, "The Ultimate");
    knowledgeRepository.save(expectedAnswer);
    
    Answer actualAnswer = answerRepository.findAnswerToQuestion(42);
    assertNotNull(actualAnswer);
    assertEquals(expectedAnswer, actualAnswer);
}
