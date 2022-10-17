#include<stdio.h>
#include<conio.h>
int main()
{
    float num1, num2, add;
    printf("Enter any two number: ");
    scanf("%f%f", &num1, &num2);
    add = num1+num2;
    printf("\nSum of %0.2f and %0.2f is %0.2f", num1, num2, add);
    getch();
    return 0;
}
