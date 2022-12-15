export default {

}


const quotes = [
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand",
    "First, solve the problem. Then, write the code",
    "Experience is the name everyone gives to their mistakes",
    "In order to be irreplaceable, one must always be different",
    "Java is to JavaScript what car is to Carpet",
    "Knowledge is power",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code",
    "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away",
    "Ruby is rubbish! PHP is phpantastic!",
    "Code is like humor. When you have to explain it, it’s bad",
    "Jai balayya"
]

export const languageChoices = [
    { name: "Java", value: "java" },
    { name: "Javascript", value: "js" },
    { name: "Python", value: "python" },
]


const questionInput = "[293 , 377 , 4 , 56 , 32 , 2 , 77 , 100 , 53 , 23 , 44 , 70 , 23 , 1]"


export const defaultCode = [
    `class Main { \n public static void main(String []args) { \n  int[] input = new int[]{293 , 377 , 4,56 , 32 , 2, 77, 100 , 53 , 23 , 44 , 70 , 23 , 1};  \n \n\n  // Write your code here \n \n\n } \n} `,
    `const input = ${questionInput}  \n \n // Write your code here`,
    `input = ${questionInput}\n\n# Write your code here`,
]

export const question = "find the minimum in an given array of numbers."

export const examples = ["[1 , 2, 10 , 26, 100] => 1"]

export const fontChoices = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

export const generateRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)]
}
