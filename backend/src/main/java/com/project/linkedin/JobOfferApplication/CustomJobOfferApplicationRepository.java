package com.project.linkedin.JobOfferApplication;

import java.util.List;

public interface CustomJobOfferApplicationRepository {
    Long getApplicationsAmount(Long id_job_offer);
    List<JobOfferApplication> getRecommended(Long id_prof);
}
