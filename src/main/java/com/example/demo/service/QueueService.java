/*package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Customer;
import com.example.demo.entity.QueueEntry;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.QueueEntryRepository;

@Service
public class QueueService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private QueueEntryRepository queueRepo;

    // Add customer + queue entry
    public QueueEntry addCustomer(Customer customer) {
        Customer savedCustomer = customerRepo.save(customer);
        QueueEntry entry = new QueueEntry(savedCustomer);
        return queueRepo.save(entry);
    }

    // Call next customer and delete both entries
    @Transactional
    public QueueEntry callNext() {
        List<QueueEntry> waiting = queueRepo.findByStatus("WAITING");
        if(waiting.isEmpty()) return null;

        QueueEntry next = waiting.stream()
                .sorted((a,b) -> b.getPriority() - a.getPriority())
                .findFirst()
                .get();

        // Delete from DB
        queueRepo.delete(next);
        Customer cust = next.getCustomer();
        if(cust != null) customerRepo.delete(cust);

        return next;
    }

    // Call priority customer (age >=60)
    @Transactional
    public QueueEntry callPriorityNext() {
        List<QueueEntry> waiting = queueRepo.findByStatus("WAITING");
        if(waiting.isEmpty()) return null;

        QueueEntry priorityCustomer = waiting.stream()
                .filter(q -> q.getPriority() > 0)
                .findFirst()
                .orElse(waiting.get(0));

        queueRepo.delete(priorityCustomer);
        Customer cust = priorityCustomer.getCustomer();
        if(cust != null) customerRepo.delete(cust);

        return priorityCustomer;
    }

    // Waiting list sorted by priority + createdAt
    public List<QueueEntry> getWaitingQueue() {
        List<QueueEntry> waiting = queueRepo.findByStatus("WAITING");
        waiting.sort((a,b) -> {
            if(b.getPriority() != a.getPriority()) return b.getPriority() - a.getPriority();
            return a.getCreatedAt().compareTo(b.getCreatedAt());
        });
        return waiting;
    }

    public QueueEntry getEntry(Long id) {
        return queueRepo.findById(id).orElse(null);
    }
}*/

package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Customer;
import com.example.demo.entity.QueueEntry;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.QueueEntryRepository;

@Service
public class QueueService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private QueueEntryRepository queueRepo;

    // Add customer + queue entry
    public QueueEntry addCustomer(Customer customer) {
        Customer savedCustomer = customerRepo.save(customer);
        QueueEntry entry = new QueueEntry(savedCustomer);
        return queueRepo.save(entry);
    }

    // Serve next normal customer
    @Transactional
    public QueueEntry callNext() {
        List<QueueEntry> waiting = getWaitingQueue();
        if(waiting.isEmpty()) return null;

        QueueEntry next = waiting.get(0);
        serveEntry(next);
        return next;
    }

    // Serve priority customer (age >= 60)
    @Transactional
    public QueueEntry callPriorityNext() {
        List<QueueEntry> waiting = getWaitingQueue();
        if(waiting.isEmpty()) return null;

        QueueEntry priority = waiting.stream()
                .filter(q -> q.getPriority() > 0)
                .findFirst()
                .orElse(waiting.get(0));

        serveEntry(priority);
        return priority;
    }

    // Serve a specific customer manually
    @Transactional
    public void serveEntry(QueueEntry entry) {
        if(entry != null) {
            queueRepo.delete(entry);
            Customer cust = entry.getCustomer();
            if(cust != null) customerRepo.delete(cust);
        }
    }

    // Get waiting queue sorted by priority & createdAt
    public List<QueueEntry> getWaitingQueue() {
        List<QueueEntry> waiting = queueRepo.findByStatus("WAITING");
        waiting.sort((a,b) -> {
            if(b.getPriority() != a.getPriority()) return b.getPriority() - a.getPriority();
            return a.getCreatedAt().compareTo(b.getCreatedAt());
        });
        return waiting;
    }

    // Get queue entry by ID
    public QueueEntry getEntry(Long id) {
        return queueRepo.findById(id).orElse(null);
    }
}
