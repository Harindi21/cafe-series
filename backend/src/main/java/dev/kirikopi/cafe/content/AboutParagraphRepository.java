// AboutParagraphRepository.java
package dev.kirikopi.cafe.content;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

interface AboutParagraphRepository
        extends JpaRepository<AboutParagraphEntity, UUID> {

    List<AboutParagraphEntity>
    findBySiteContentIdAndActiveTrueOrderBySortOrderAsc(
            UUID siteContentId
    );
}