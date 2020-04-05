#!/usr/bin/env node
"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var program = require('commander');
var Table = require('cli-table');
var api = require('./api');
var colWidth;
clear();
console.log(chalk.blue(figlet.textSync('Covid19', {
    font: 'Ghost',
    horizontalLayout: 'full',
    verticalLayout: 'default'
})));
function getCovidDetails(response) {
    if (program.args[0] == 'india' && program.district) {
        var table_1 = new Table({
            head: ['S.No', 'State', 'Confirmed', 'Confirmed Today', chalk.red.bold('Deaths'), chalk.red.bold('Deaths Today'), chalk.green.bold('Recovered'), 'Active Cases'],
            colWidths: [5, 25, 15, 20, 15, 15, 15, 15],
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
                'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
                'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
                'right': '║', 'right-mid': '╢', 'middle': '│',
            },
        });
        var totalCases = response[0];
        response.map(function (data, index) {
            table_1.push([
                index + 1,
                data.state,
                data.confirmed,
                data.delta.confirmed,
                data.deaths,
                data.delta.deaths,
                data.recovered,
                data.active
            ]);
        });
        table_1.push([
            '',
            totalCases.state,
            totalCases.confirmed,
            totalCases.delta.confirmed,
            totalCases.deaths,
            totalCases.delta.deaths,
            totalCases.recovered,
            totalCases.active
        ]);
        console.log(table_1.toString());
    }
    else {
        var table = new Table({
            colWidths: [15, 25],
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
                'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
                'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
                'right': '║', 'right-mid': '╢', 'middle': '│',
            },
        });
        var data = [];
        if (response == 'Country not found') {
            console.log('No matched data found');
        }
        else {
            for (var key in response) {
                if (response.hasOwnProperty(key)) {
                    data.push([chalk.cyan.bold(key), chalk.green.bold(response[key])]);
                }
            }
            table.push.apply(table, data);
            console.log(table.toString());
        }
    }
}
program
    .version('1.2.1')
    .description("Track corona virus in your terminal")
    .option('-d, --district', 'Get Get District wise data for India <cvirus india -d>')
    .option('-a, --all', 'Get Summary details')
    .parse(process.argv);
if (!program.all && program.args.length > 0 && !program.district) {
    api.getCountryWiseData(program.args[0], getCovidDetails);
}
if (program.all) {
    api.getLatestData(getCovidDetails);
}
if (program.args[0] == 'india' && program.district) {
    api.getDetailsForIndia(getCovidDetails);
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
