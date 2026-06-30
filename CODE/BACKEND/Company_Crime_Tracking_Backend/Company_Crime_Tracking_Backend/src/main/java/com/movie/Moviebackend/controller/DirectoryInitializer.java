package com.movie.Moviebackend.controller;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.io.File;

@Component
public class DirectoryInitializer {

    private final String DOCUMENT_DIR = "C:/Users/KALANITHI/Videos/CODE/BACKEND/Company_Crime_Tracking_Backend/Company_Crime_Tracking_Backend/documents"; // Adjust to your path

    @PostConstruct
    public void init() {
        File directory = new File(DOCUMENT_DIR);
        if (!directory.exists()) {
            boolean created = directory.mkdirs(); // Create the directory if it doesn't exist
            if (created) {
                System.out.println("Documents directory created: " + DOCUMENT_DIR);
            } else {
                System.err.println("Failed to create documents directory: " + DOCUMENT_DIR);
            }
        } else {
            System.out.println("Documents directory already exists: " + DOCUMENT_DIR);
        }
    }
}
