package com.raihanorium.springreact.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;

public interface Paths {
    String HOME = "/home";
    String REST_API_BASE = "/rest/api/v1";
    String COMPANIES = REST_API_BASE + "/companies";
}
