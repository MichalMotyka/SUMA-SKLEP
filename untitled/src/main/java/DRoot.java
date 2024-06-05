public class DRoot {
    public static int digital_root(int n) {
        int result = n;
        do{
            System.out.println(String.valueOf(result));
            System.out.println(String.valueOf(result).split("").length);
            System.out.println(String.valueOf(result).split("").length == 1);
            result = sumDigits(String.valueOf(result).split(""));
        }
        while(String.valueOf(result).split("").length != 1);

        return result;
    }
    private static int sumDigits(String[] a){
        int result = 0;
        for(String digit:a){
            result += Integer.parseInt(digit);
        };
        return result;
    }
}
