import test from 'node:test';
import assert from 'node:assert/strict';
import {purchase,validateIssue} from '../src/lib/model.js';
const item={id:'WHEAT-042',status:'Открыт',issueSum:'12,0 млн ₽'};
test('purchase accumulates holdings and preserves other positions',()=>{
 const previous=[{id:'OTHER',amount:100000,tokens:100}];
 const first=purchase(previous,item,'100000');
 const second=purchase(first,item,'250000');
 assert.deepEqual(second,[previous[0],{id:item.id,amount:350000,tokens:350}]);
 assert.equal(previous.length,1);
});
test('rejects invalid amounts, unavailable issues and exceeding supply',()=>{
 for(const n of ['',-1,0,99999,'abc',100001,Infinity])assert.throws(()=>purchase([],item,n));
 assert.throws(()=>purchase([],{...item,status:'Подготовка'},100000));
 assert.throws(()=>purchase([{id:item.id,amount:12000000,tokens:12000}],item,100000));
 assert.throws(()=>purchase([],item,12001000));
});
test('issue parameters are validated before submission',()=>{
 const good={amount:'12000000',days:'120',rate:'16.5'};
 assert.equal(validateIssue(good),'');
 for(const bad of [{amount:0},{amount:12001000},{days:366},{days:1.5},{rate:'bad'},{rate:0}])assert.notEqual(validateIssue({...good,...bad}),'');
});
