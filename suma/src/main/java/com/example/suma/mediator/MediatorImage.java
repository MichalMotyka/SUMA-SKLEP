package com.example.suma.mediator;

import com.example.suma.entity.ImageEntity;
import com.example.suma.entity.ImageResponse;
import com.example.suma.entity.Product;
import com.example.suma.entity.dto.ImageDTO;
import com.example.suma.exceptions.FtpConnectionException;
import com.example.suma.repository.ProductRepository;
import com.example.suma.service.FtpService;
import com.example.suma.service.ImageService;
import com.example.suma.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@AllArgsConstructor
public class MediatorImage {

    private final FtpService ftpService;
    private final ProductService productService;
    private final ProductRepository productRepository;


    public ResponseEntity<?> saveImage(MultipartFile file,String uuid){
        try{
            if (file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1).equals("png")) {
                ImageEntity imageEntity = ftpService.uploadFileToFtp(file);
                productService.addImage(imageEntity,uuid);
                return ResponseEntity.ok(
                        ImageDTO.builder()
                                .uuid(imageEntity.getUuid())
                                .createAt(imageEntity.getCreateAt()).build());
            }
            return ResponseEntity.status(400).body(new ImageResponse("MediaType not supported"));
        }catch (IOException e){
            return ResponseEntity.status(400).body(new ImageResponse("File dont exist"));
        }catch (FtpConnectionException e1){
            return ResponseEntity.status(400).body(new ImageResponse("Cannot save file"));
        }

    }

    public ResponseEntity<ImageResponse> delete(String uuid,String product) {
        try {
            Product productEntity = productService.getProductByUuid(product);
            if (productEntity != null){
                productEntity.getImages().remove(uuid);
                productRepository.save(productEntity);
                ftpService.deleteFile(uuid);
                return ResponseEntity.ok(new ImageResponse("File deleted"));
            }
            return ResponseEntity.ok(new ImageResponse("File dont exist"));
        } catch (IOException e) {
            return ResponseEntity.status(400).body(new ImageResponse("Cannot delete file"));
        }
    }
//
//    public ResponseEntity<?> getImage(String uuid) throws IOException {
//        ImageEntity imageEntity = imageService.findByUuid(uuid);
//        if (imageEntity != null){
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.IMAGE_PNG);
//         return new ResponseEntity<>(ftpService.getFile(imageEntity).toByteArray(),headers, HttpStatus.OK);
//        }
//        return ResponseEntity.status(400).body(new ImageResponse("File dont exist"));
//    }
//
//    public ResponseEntity<ImageResponse> activateImage(String uuid) {
//        ImageEntity imageEntity = imageService.findByUuid(uuid);
//        if (imageEntity != null){
//            imageEntity.setUsed(true);
//            imageService.save(imageEntity);
//            return ResponseEntity.ok(new ImageResponse("Image successfully activated"));
//        }
//        return ResponseEntity.status(400).body(new ImageResponse("File dont exist"));
//    }
}
