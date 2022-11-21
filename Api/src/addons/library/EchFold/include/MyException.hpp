/**
* Created by ruby on 14/08/22.
*/

#ifndef RONGEUR_MYEXCEPTION_HPP
#define RONGEUR_MYEXCEPTION_HPP

#include <exception>
#include <string>
#include <utility>

class MyException : public std::exception {
private:
    std::string _message;
public:
    explicit MyException(std::string  message) : _message(std::move(message)) {}
    [[nodiscard]] const char* what() const noexcept override { return _message.c_str(); }
};

#endif //RONGEUR_MYEXCEPTION_HPP
