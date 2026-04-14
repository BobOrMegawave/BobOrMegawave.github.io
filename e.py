# bad_code.py — purposely horrible for SonarQube

import os
import sys
import json
from math import *  # wildcard import

SECRET_KEY = "123456"  # hardcoded credentials
password = "supersecret"  # another hardcoded password

def useless_function(a, b):
    if a == b:
        return True
    else:
        return True  # always true, logic flaw

def huge_complexity(x):
    if x > 10:
        if x % 2 == 0:
            if x % 3 == 0:
                if x % 4 == 0:
                    if x % 5 == 0:
                        print("wow")  # deep nesting
    return x

def sql_injection(user_input):
    query = "SELECT * FROM users WHERE name = '" + user_input + "'"  # SQL injection risk
    print(query)

def empty_except():
    try:
        1 / 0
    except:
        pass  # swallow all exceptions

def long_method():
    for i in range(1000):
        print(i)  # performance issue
    return None

class BadClass:
    def __init__(self):
        pass

    def __del__(self):
        pass  # empty destructor

def duplicate_code():
    print("repeat")
def duplicate_code_again():
    print("repeat")  # duplicated logic

if __name__ == "__main__":
    useless_function(1, 2)
    huge_complexity(120)
    sql_injection("admin' --")
    empty_except()
    long_method()
    duplicate_code()
    duplicate_code_again()
