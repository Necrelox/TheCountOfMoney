//
// Created by ruby on 04/11/22.
//

#include "File.hpp"
#include "MyException.hpp"

File::File(std::filesystem::path &&path) {
    if (!std::filesystem::exists(path)) {
        std::ofstream file(path);
        file.close();
    }
    this->_file.open(path, std::ios::in | std::ios::out | std::ios::binary);
    if (!this->_file.is_open())
        throw MyException("Can't open the file");
    this->_path = path;
    this->_name = path.filename().string();
    this->_extension = path.extension().string();
    this->_size = std::filesystem::file_size(path);
}

File::File(const File &file) {
    this->_path = file.getPath();
    this->_name = file.getName();
    this->_extension = file.getExtension();
    this->_size = file.getSize();
}
#include <iostream>
File::~File() {
    std::cout << "File destructor : " << this->_name << std::endl;
    this->_file.close();
}

const std::filesystem::path &File::getPath() const {
    return this->_path;
}

const std::string &File::getName() const {
    return this->_name;
}

const size_t &File::getSize() const {
    return this->_size;
}

const std::string &File::getExtension() const {
    return this->_extension;
}

const size_t &File::getCursorPosition() const {
    return this->_cursorPosition;
}

void File::addCursorPosition(const size_t &cursorPosition) {
    if (this->_cursorPosition + cursorPosition > this->_size)
        this->_cursorPosition = this->_size;
    else
        this->_cursorPosition += cursorPosition;
}

#include <iostream>
#include <vector>

std::unique_ptr<char[]> File::getContentByPosAndSize(const size_t &cursorPosition, const size_t &size) {
    if (cursorPosition > this->_size)
        throw MyException("The cursor position is out of range");
    this->_file.seekg(static_cast<long>(cursorPosition));

//    std::fstream teste(this->_path, std::ios::in | std::ios::out | std::ios::binary);
    std::fstream teste;
    teste.open(this->_path, std::ios::in | std::ios::out | std::ios::binary);
    teste.seekg(static_cast<long>(cursorPosition));
    std::unique_ptr<char[]> buffer = std::make_unique<char[]>(size);
    teste.read(buffer.get(), size);
    teste.close();

    return buffer;
}

void File::write(const std::unique_ptr<char[]> &&buffer, const size_t &size) {
    this->_file.write(buffer.get(), static_cast<long>(size));
}

