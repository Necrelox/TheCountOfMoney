//
// Created by ruby on 23/10/22.
//

#include "EchFold.hpp"
#include <random>
#include <iostream>

// salade california && wedges sans sel
int main() {
    try {
//        EchFoldLocker("/home/ruby/Documents/Perso/EchBoard/Api/src/addons/library/EchFold/test.mp4");
        EchFoldLocker("/home/ruby/Documents/Perso/EchBoard/Api/src/addons/library/EchFold/LICENSE");
    } catch (const std::exception &e) {
        std::cerr << e.what() << std::endl;
    }


//    std::random_device rd;
//    std::mt19937 gen(1);
//    const unsigned int seed = rd();
//    std::cout << seed << std::endl;
//    std::cout << "Seed: " << gen() << std::endl;
//    gen.seed(1);
//    std::uniform_int_distribution<> dis(100, 900);
//    for (int i = 0; i < 10; ++i) {
//        std::cout << std::to_string(dis(gen)) << std::endl;
//    }
//    std::cout << "----------------" << std::endl;
//    gen.seed(1);
//    for (int i = 0; i < 10; ++i) {
//        std::cout << std::to_string(dis(gen)) << std::endl;
//    }
    return 0;
}