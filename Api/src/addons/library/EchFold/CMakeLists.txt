cmake_minimum_required(VERSION 3.22)
project(EchFold
        VERSION 0.1
        LANGUAGES CXX
    )

set(CMAKE_DEBUG_POSTFIX d)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# get all src in src folder
file(GLOB_RECURSE SRC_FILES "src/*.cpp")

#add_library(${PROJECT_NAME} SHARED ${CMAKE_CURRENT_SOURCE_DIR}/src/EchFold.cpp)
add_executable(${PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR}/src/main.cpp ${SRC_FILES})

target_link_libraries(${PROJECT_NAME} PRIVATE uuid)

target_include_directories(${PROJECT_NAME} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)

if(CMAKE_BUILD_TYPE MATCHES Debug)
    target_compile_options(${PROJECT_NAME} PUBLIC -g3 -O0 -Wall -Wextra -Werror -pedantic -fvisibility=hidden)
else()
    if (MSVC)
        target_compile_options(${PROJECT_NAME} PUBLIC /W4 /WX)
    else()
        target_compile_options(${PROJECT_NAME} PUBLIC -g3 -O3 -Wall -Wextra -Werror -pedantic -fvisibility=hidden)
    endif()
endif()
