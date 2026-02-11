package com.example.demo.dto;

import com.example.demo.entity.Customer;

public class QueueResponse {

    private Long queueId;
    private Customer customer;
    private int position;
    private int estimatedWaitMinutes;
    private String status;

    public QueueResponse(Long queueId, Customer customer, int position,
                         int estimatedWaitMinutes, String status) {
        this.queueId = queueId;
        this.customer = customer;
        this.position = position;
        this.estimatedWaitMinutes = estimatedWaitMinutes;
        this.status = status;
    }

    public Long getQueueId() { return queueId; }
    public Customer getCustomer() { return customer; }
    public int getPosition() { return position; }
    public int getEstimatedWaitMinutes() { return estimatedWaitMinutes; }
    public String getStatus() { return status; }
}
