#ifndef ECHFOLD_LIBRARY_H
#define ECHFOLD_LIBRARY_H

#include "visibility.hpp"
#include <string>

#define SIZE_BLOBS 8192

struct EchFold {
    std::string path;
    size_t size;
    size_t seed;
};

DLL_PUBLIC
EchFold EchFoldLocker(const std::string& path);

#endif //ECHFOLD_LIBRARY_H
