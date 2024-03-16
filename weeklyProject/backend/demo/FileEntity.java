package com.example.demo;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pid;
    @Column(nullable = false, length = 1000)
    private String filename;
    @CreatedDate
    @Column(nullable = false, unique= false,updatable = false)
    private LocalDateTime created_dt;
    @Column(unique= false)
    private String title;
    @Column(unique= false)
    private String desc;
    @Column(unique= false)
    private String ingredient;
    @Column(unique= false)
    private String content;

    
}