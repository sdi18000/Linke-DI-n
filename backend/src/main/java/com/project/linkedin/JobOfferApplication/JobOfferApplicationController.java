package com.project.linkedin.JobOfferApplication;



import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import javax.websocket.server.PathParam;
import java.util.List;


@RestController
public class JobOfferApplicationController {

    private final JobOfferApplicationRepository repository;

    JobOfferApplicationController(JobOfferApplicationRepository repository) {
        this.repository = repository;
    }

    // Aggregate root

    @GetMapping("/jobofferapplications")
    List<JobOfferApplication> all() {
        return repository.findAll();
    }

    @PostMapping("/jobofferapplications")
    JobOfferApplication newJobOffer(@RequestBody JobOfferApplication newJobOfferApplication) {
        return repository.save(newJobOfferApplication);
    }
}