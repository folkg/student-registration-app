package com.srsapi.dao;

import com.srsapi.model.jsonResponse;

public interface IDataStore {
    jsonResponse getStudent(String uuid);
    jsonResponse login(String username, String password);
}
