package dev.kirikopi.cafe.media;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
class MediaService {

    private final MediaAssetRepository repository;

    MediaService(MediaAssetRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    PublicMediaResponse getPublicMedia() {
        return new PublicMediaResponse(
                first(MediaPurpose.HERO),
                first(MediaPurpose.ABOUT),
                list(MediaPurpose.GALLERY)
        );
    }

    private MediaResponse first(MediaPurpose purpose) {
        return repository
                .findByPurposeAndActiveTrueOrderBySortOrderAsc(purpose)
                .stream()
                .findFirst()
                .map(this::toResponse)
                .orElse(null);
    }

    private List<MediaResponse> list(MediaPurpose purpose) {
        return repository
                .findByPurposeAndActiveTrueOrderBySortOrderAsc(purpose)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private MediaResponse toResponse(MediaAssetEntity entity) {
        return new MediaResponse(
                entity.id().toString(),
                "/api/v1/media/" + entity.id() + "/content",
                entity.altText()
        );
    }

    record PublicMediaResponse(
            MediaResponse hero,
            MediaResponse about,
            List<MediaResponse> gallery
    ) {
    }

    record MediaResponse(
            String id,
            String url,
            String alt
    ) {
    }
}