/**
 * Example usage of vnstock TypeScript library with DNSE provider
 * 
 * This file demonstrates how to use the vnstock library with DNSE data source.
 * Note: DNSE provider requires authentication for most operations.
 */

import { DNSETradingProvider } from './src/connector/dnse/trading';

async function main() {
  console.log('=== Vnstock DNSE Examples ===\n');

  const dnse = new DNSETradingProvider();

  // 1. Login (Requires real credentials)
  // Replace with your actual username and password
  const username = 'YOUR_USERNAME';
  const password = 'YOUR_PASSWORD';

  if (username === 'YOUR_USERNAME') {
    console.log('Please update the username and password in examples-dnse.ts to run this example.');
    return;
  }

  console.log(`Logging in as ${username}...`);
  const token = await dnse.login(username, password);

  if (!token) {
    console.error('Login failed. Exiting.');
    return;
  }

  console.log('Login successful!');

  // 2. Get Account Info
  console.log('\nFetching account info...');
  const account = await dnse.account();
  console.log('Account:', account);

  // 3. Get Sub Accounts
  console.log('\nFetching sub-accounts...');
  const subAccounts = await dnse.subAccounts();
  console.log(`Found ${subAccounts?.length || 0} sub-accounts`);

  if (subAccounts && subAccounts.length > 0) {
    const subAccount = subAccounts[0].accountNumber;
    console.log(`Using sub-account: ${subAccount}`);

    // 4. Get Account Balance
    console.log(`\nFetching balance for ${subAccount}...`);
    const balance = await dnse.accountBalance(subAccount);
    console.log('Balance:', balance);

    // 5. Get Loan Packages
    console.log(`\nFetching loan packages for ${subAccount}...`);
    const loanPackages = await dnse.loanPackages(subAccount);
    console.log(`Found ${loanPackages?.length || 0} loan packages`);

    // 6. Get Trade Capacities (Buying Power)
    // Example: Check buying power for VNM at price 65000
    console.log(`\nChecking buying power for VNM at 65000...`);
    const capacities = await dnse.tradeCapacities('VNM', 65000, subAccount);
    console.log('Capacities:', capacities);

    // 7. Order Management (Commented out to prevent accidental orders)
    /*
    // Request OTP for trading token
    await dnse.emailOtp();
    console.log('OTP sent to email. Please enter OTP to continue.');
    
    // In a real app, you would prompt for OTP input
    const otp = '123456'; 
    const tradingToken = await dnse.getTradingToken(otp);

    if (tradingToken) {
      // Place Order
      console.log('\nPlacing order...');
      const order = await dnse.placeOrder(
        subAccount,
        'VNM',
        'buy',
        100,
        65000,
        'LO'
      );
      console.log('Order placed:', order);

      // Get Order List
      console.log('\nFetching order list...');
      const orders = await dnse.orderList(subAccount);
      console.log(`Found ${orders?.length || 0} orders`);
    }
    */
  }

  console.log('\n=== Examples Complete ===');
}

// Run examples
main().catch(console.error);
