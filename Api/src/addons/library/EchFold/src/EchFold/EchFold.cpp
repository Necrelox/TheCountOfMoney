#include "EchFold.hpp"
#include "ESplit.hpp"
#include "MyException.hpp"

EchFold EchFoldLocker(const std::string &path) {
    try {
        if (!std::filesystem::exists(path))
            throw MyException("The file doesn't exist");
        File file(path);
        ESplit split(std::move(file), SIZE_BLOBS);
        std::vector<File> blobs = split.getBlobs();


        EchFold echFold{
                .path = split.getWorkingDirectory().string(),
                .size = split.getOriginalFile().getSize(),
                .seed = split.getSeed()
        };
        return echFold;
    } catch (const std::exception &e) {
        throw MyException(e.what());
    }
}

void EchFoldUnLocker() {
    

}