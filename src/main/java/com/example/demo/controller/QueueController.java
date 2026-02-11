/*package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Customer;
import com.example.demo.entity.QueueEntry;
import com.example.demo.service.QueueService;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin
public class QueueController {

    @Autowired
    private QueueService service;

    // Add customer
    @PostMapping("/add")
    public QueueEntry addCustomer(@RequestBody Customer customer) {
        return service.addCustomer(customer);
    }

    // Call next
    @GetMapping("/next")
    public QueueEntry callNext() {
        return service.callNext();
    }

    // Call priority next
    @GetMapping("/priorityNext")
    public QueueEntry callPriorityNext() {
        return service.callPriorityNext();
    }

    // Get waiting list
    @GetMapping("/waiting")
    public List<QueueEntry> getWaiting() {
        return service.getWaitingQueue();
    }

    // Get status by token
    @GetMapping("/status/{id}")
    public String getStatus(@PathVariable Long id) {
        QueueEntry entry = service.getEntry(id);
        if(entry == null) return "Invalid Token";

        List<QueueEntry> waiting = service.getWaitingQueue();
        int position = 1;
        for(QueueEntry q: waiting) {
            if(q.getId().equals(id)) break;
            position++;
        }

        if(waiting.stream().noneMatch(q -> q.getId().equals(id))) return "Served / Done";
        return "WAITING | Position: " + position;
    }
}    // queue wise 
*/
package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Customer;
import com.example.demo.entity.QueueEntry;
import com.example.demo.service.QueueService;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin
public class QueueController {

    @Autowired
    private QueueService service;

    // Add customer
    @PostMapping("/add")
    public QueueEntry addCustomer(@RequestBody Customer customer) {
        return service.addCustomer(customer);
    }

    // Serve next normal customer
    @PostMapping("/next")
    public QueueEntry callNext() {
        return service.callNext();
    }

    // Serve priority customer (age >= 60)
    @PostMapping("/priority-next")
    public QueueEntry callPriorityNext() {
        return service.callPriorityNext();
    }

    // Admin: serve a specific customer manually
    @PostMapping("/call/{id}")
    public ResponseEntity<?> callSpecific(@PathVariable Long id) {
        QueueEntry entry = service.getEntry(id);
        if(entry == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Customer with ID " + id + " not found in queue.");
        }
        service.serveEntry(entry);
        return ResponseEntity.ok(entry);
    }

    // Get waiting list (for admin panel)
    @GetMapping("/waiting")
    public List<QueueEntry> getWaiting() {
        return service.getWaitingQueue();
    }

    // Get status by token (for customer)
    @GetMapping("/status/{id}")
    public String getStatus(@PathVariable Long id) {
        QueueEntry entry = service.getEntry(id);
        if(entry == null) return "Invalid Token";

        List<QueueEntry> waiting = service.getWaitingQueue();
        int position = 1;
        for(QueueEntry q: waiting) {
            if(q.getId().equals(id)) break;
            position++;
        }

        if(waiting.stream().noneMatch(q -> q.getId().equals(id))) return "Served / Done";
        return "WAITING | Position: " + position;
    }
}
