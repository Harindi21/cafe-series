package dev.kirikopi.cafe.media;

import java.io.InputStream;

interface MediaStorage {

    void store(
            String objectKey,
            InputStream content,
            long contentLength,
            String contentType
    );

    byte[] load(String objectKey);

    void delete(String objectKey);
}