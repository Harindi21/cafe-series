// ContactProfileRepository.java
package dev.kirikopi.cafe.contact;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface ContactProfileRepository
        extends JpaRepository<ContactProfileEntity, UUID> {
}