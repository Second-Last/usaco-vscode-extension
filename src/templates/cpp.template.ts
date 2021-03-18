export function getCppTemplate(taskName: string, iD: string, usefStream: boolean) {
    const correctedTaskName = taskName.toLowerCase();

    if (usefStream) {
        return `/*
ID: ${iD}
TASK: ${correctedTaskName}
LANG: C++
*/

#include <iostream>
#include <fstream>

using namespace std;

int main () 
{
    ofstream fout ("${correctedTaskName}.out");
    ifstream fin ("${correctedTaskName}.in");



    return 0;
}
`;
    } else {
        return `/*
ID: ${iD}
TASK: ${correctedTaskName}
LANG: C++
*/

#include <iostream>

using namespace std;

int main () 
{
    

    return 0;
}
`;
    }
}