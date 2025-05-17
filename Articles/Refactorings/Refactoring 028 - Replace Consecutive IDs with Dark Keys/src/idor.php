<?php

class Invoice {
    public int $id;
    // The external identifier is never an essential
    // responsibilty for an object
  
    public string $customerName;
    public array $items;

    public function __construct(
      int $id, string $customerName, array $items) {
        $this->id = $id;
        $this->customerName = $customerName;
        $this->items = $items;
    }
}