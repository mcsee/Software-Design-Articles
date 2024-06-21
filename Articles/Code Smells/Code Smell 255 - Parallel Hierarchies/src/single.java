public class TransactionService {
    private EntityManager entityManager;

    public TransactionService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void saveTransaction(Transaction transaction) {
        entityManager.getTransaction().begin();
        entityManager.persist(transaction);
        entityManager.getTransaction().commit();
    }

    public Transaction loadTransaction(
        Long id, Class<? extends Transaction> transactionClass) {
        return entityManager.find(transactionClass, id);
    }
}