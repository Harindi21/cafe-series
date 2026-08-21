package dev.kirikopi.cafe.media;

import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/media")
class MediaController {

    private final MediaService mediaService;
    private final MediaAssetRepository repository;
    private final MediaStorage storage;

    MediaController(
            MediaService mediaService,
            MediaAssetRepository repository,
            MediaStorage storage
    ) {
        this.mediaService = mediaService;
        this.repository = repository;
        this.storage = storage;
    }

    @GetMapping
    ResponseEntity<MediaService.PublicMediaResponse> getPublicMedia() {
        return ResponseEntity.ok()
                .cacheControl(
                        CacheControl.maxAge(Duration.ofMinutes(5))
                                .cachePublic()
                )
                .body(mediaService.getPublicMedia());
    }

    @GetMapping("/{id}/content")
    ResponseEntity<byte[]> getContent(
            @PathVariable UUID id
    ) {
        var asset = repository.findById(id)
                .filter(MediaAssetEntity::isActive)
                .orElseThrow(() ->
                        new IllegalArgumentException("Media asset not found")
                );

        var bytes = storage.load(asset.objectKey());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(asset.contentType()))
                .cacheControl(
                        CacheControl.maxAge(Duration.ofDays(7))
                                .cachePublic()
                )
                .body(bytes);
    }
}