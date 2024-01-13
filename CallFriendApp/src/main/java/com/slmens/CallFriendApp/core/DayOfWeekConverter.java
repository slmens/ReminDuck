package com.slmens.CallFriendApp.core;

import java.util.ArrayList;
import java.util.List;

public class DayOfWeekConverter {

    public static List<DayOfWeek> convertToEnumList(List<String> dayStrings) {
        List<DayOfWeek> dayEnums = new ArrayList<>();
        for (String dayString : dayStrings) {
            DayOfWeek dayEnum = DayOfWeek.valueOf(dayString.toUpperCase());
            dayEnums.add(dayEnum);
        }
        return dayEnums;
    }
}
