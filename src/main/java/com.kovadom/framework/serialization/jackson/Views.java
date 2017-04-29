package com.kovadom.framework.serialization.jackson;

public class Views {

    public static class Public {

    }

    public static class Dependency extends Public {

    }

    public static class Extra extends Dependency {

    }

    public static class Internal extends Extra {

    }

}
