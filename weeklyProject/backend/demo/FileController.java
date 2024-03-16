package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    private FileRepository fileRepository;

    // 파일이 저장될 디렉토리 경로 설정
    String filepath = "C:/Users/sisi9/imges/";

    @PostMapping("image")
    public ResponseEntity<FileEntity> uploadImage(HttpServletRequest request,
                                  @RequestParam("file") MultipartFile[] files, // required=true가 기본값이므로 생략
                                  @RequestParam("title") String title,
                                  @RequestParam("desc") String desc,
                                  @RequestParam("ingredient") String ingredient,
                                  @RequestParam("content") String content
    		) {

        // 파일 배열이 비어 있는지 확인
        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().build(); // 파일이 없으면 400 Bad Request 반환
        }

        for (MultipartFile file : files) {
            String originFileName = file.getOriginalFilename();
            long fileSize = file.getSize();
            String safeFile = System.currentTimeMillis() + originFileName;

            // 파일 저장 경로 설정
            Path path = Paths.get(filepath + safeFile);

            try {
                // 파일 저장
                Files.write(path, file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().build(); // 파일 저장 실패 시 400 Bad Request 반환
            }

            // FileEntity 생성 및 저장
            FileEntity fileEntity = FileEntity.builder()
                    .filename(safeFile)
                    .created_dt(LocalDateTime.now()) // 현재 시간으로 설정
                    .title(title)
                    .desc(desc)
                    .ingredient(ingredient)
                    .content(content)
                    .build();

            fileRepository.save(fileEntity);
        }

        // 파일이 성공적으로 업로드되었음을 반환
        return ResponseEntity.ok().build();
    }
    @GetMapping("image")
    public List<FileEntity> findAllImages() { return fileRepository.findAll(); }
    @GetMapping("/{id}")
    public ResponseEntity<FileEntity> getPostById(@PathVariable Long id) {
        Optional<FileEntity> file = fileRepository.findById(id);
        return file.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}