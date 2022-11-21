//
// Created by ruby on 06/11/22.
//

#include "ESplit.hpp"
#include "MyException.hpp"

#include <uuid/uuid.h>

size_t ESplit::_randomSelectBufferInRange(auto &gen, const std::pair<size_t, size_t> &range) const {
    std::uniform_int_distribution<size_t> dist(range.first, range.second);
    return dist(gen);
}

unsigned short ESplit::_randomSelectBlob(auto &gen, size_t numberBlobs) const {
    std::uniform_int_distribution<unsigned short> dis(0, numberBlobs - 1);
    std::random_device rd;
    return dis(gen);
}

std::pair<size_t, size_t> ESplit::_calculateRangeBySizeBlobForBuffer(const size_t &sizeBlob) const {
    return {
            static_cast<size_t> (static_cast<double>(sizeBlob) * 0.01),
            static_cast<size_t> (static_cast<double>(sizeBlob) * 0.02)
    };
}

std::string ESplit::_generateUUID() const {
    uuid_t uuid;
    uuid_generate(uuid);
    char uuid_str[37];
    uuid_unparse(uuid, uuid_str);
    return uuid_str;
}

void ESplit::_initializeFolder() {
    std::string uuid(this->_generateUUID());
    std::filesystem::create_directory(this->_originalFile.getPath().parent_path() / uuid);
    this->_workingDirectory = this->_originalFile.getPath().parent_path() / uuid;
}

void ESplit::_initializeSeed() {
    this->_seed = std::random_device()();
}

void ESplit::_calculateNumberBlobs() {
    const size_t fileSizeMinForSplit = this->_minimumSizeBlobs * 20; // _minimumSizeBlobs is always 5% of the original file
    if (this->_originalFile.getSize() < fileSizeMinForSplit) {
        this->_sizeOfBlobs = this->_originalFile.getSize();
        this->_numberBlobs = 1;
    }
    else {
        this->_sizeOfBlobs = static_cast<size_t> (static_cast<double>(this->_originalFile.getSize()) * 0.05);
        this->_numberBlobs = (this->_originalFile.getSize() / this->_sizeOfBlobs) + (this->_originalFile.getSize() % this->_sizeOfBlobs != 0);
    }
}

void ESplit::_createBlobs() {
    this->_blobs.reserve(this->_numberBlobs);
    for (unsigned int i = 0; i < this->_numberBlobs; ++i) {
        std::string uuid(this->_generateUUID());
        std::filesystem::path path(this->_workingDirectory / uuid);
        this->_blobs.emplace_back(std::move(path));
    }
}

void ESplit::_algorithm() {
    std::pair<size_t, size_t> range = this->_calculateRangeBySizeBlobForBuffer(this->_sizeOfBlobs);
    std::mt19937 gen(this->_seed);

    while (this->_originalFile.getSize() > this->_originalFile.getCursorPosition()) {
        unsigned short indexBlob = this->_randomSelectBlob(gen, this->_numberBlobs); // selection random of the blob to add the buffer
        size_t sizeBuffer = this->_randomSelectBufferInRange(gen, range); // selection random of the range of the buffer to vampirize the original file
        sizeBuffer = this->_originalFile.getSize() - this->_originalFile.getCursorPosition() < sizeBuffer ? this->_originalFile.getSize() - this->_originalFile.getCursorPosition() : sizeBuffer; // if the size of the buffer is greater than the size of the original file, the size of the buffer is equal to the size of the original file
        this->_blobs[indexBlob].write(this->_originalFile.getContentByPosAndSize(this->_originalFile.getCursorPosition(), sizeBuffer), sizeBuffer); // vampirize the original file for add the buffer in the blob
        this->_originalFile.addCursorPosition(sizeBuffer); // update the cursor position of the original file
    }
}

ESplit::ESplit(const File &&originalFile, const unsigned int &limitSizeBlobs)
: _originalFile(originalFile), _minimumSizeBlobs(limitSizeBlobs) {
    this->_initializeFolder();
    this->_initializeSeed();
    this->_calculateNumberBlobs();
    this->_createBlobs();
    this->_algorithm();
}

std::vector<File> ESplit::getBlobs() const {
    return this->_blobs;
}

const File &ESplit::getOriginalFile() const {
    return this->_originalFile;
}

const std::filesystem::path &ESplit::getWorkingDirectory() const {
    return this->_workingDirectory;
}

unsigned int ESplit::getSeed() const {
    return this->_seed;
}