const fs = require('fs');
const stream = fs.createWriteStream("cases.txt");
stream.once('open', function (fd) {
    const files = fs.readdirSync('./');
    const lines = new Set();
    files.forEach(file => {
        if (file.search('.svg') > -1) {
            const name = file.split('.')[0];
            const themeAvailable = name.search('-Dark') > -1 || name.search('-Light') > -1;
            const _name = name.replace('-Dark', '').replace('-Light', '');
            if((/^[A-Z]*$/).test(_name)){
                lines.add(
                    `case '${_name}' : return ${themeAvailable? `theme === dark ? ${_name}_Dark : ${_name}_Light` : _name  }`
                )
            }
            else{
                const __name = _name.split(/(?=[A-Z])/).join('_');
                lines.add(
                    `case '${__name.toUpperCase()}' : return ${themeAvailable? `theme === dark ? ${__name}_Dark : ${__name}_Light` : __name  }`
                )
            }
        }
    })
    lines.forEach(
        line => {
            stream.write(`${line} \n`);
        }
    )

    stream.end();
});