describe('Fetch users who signed up on a particular date', () => {
    it('should fetch all users signed up today', () => {
        // const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
        const today = new Date().toLocaleDateString('en-CA'); // 'en-CA' returns date in 'YYYY-MM-DD' format
        cy.log(today)


        // SQL query to fetch users by signup_date
        const query = 'SELECT * FROM users WHERE signup_date = ?';

        // Execute the query via Cypress plugin
        cy.task('executeQuery', { query, params: [today] }).then((results) => {
            console.log('Results from the task:', results); 
            cy.log('Results: ' + JSON.stringify(results));
            // Verify the results 
            expect(results).to.be.an('array'); 
            

            results.forEach((user) => {
                expect(user).to.have.property('username');
                expect(user).to.have.property('email');
                // expect(user.signup_date).to.eq(today); // Ensure the date matches

                // Normalize the signup_date to match the format (YYYY-MM-DD)
                const userSignupDate = new Date(user.signup_date).toLocaleDateString('en-CA');
                
                // Compare only the date part (YYYY-MM-DD)
                expect(userSignupDate).to.eq(today); // Ensure the date matches
            });

            // Log results for debugging
            cy.log('Users signed up today:', results);


            // Format each user's signup_date to YYYY-MM-DD
            const formattedResults = results.map((user) => {
                const formattedDate = new Date(user.signup_date).toLocaleDateString('en-CA'); // Format to YYYY-MM-DD
                user.signup_date = formattedDate; 
                return user; 
            });

            // Write the formatted results to a file
            const filePath = 'cypress/results/users_signed_up_today.json'; 
            cy.writeFile(filePath, formattedResults).then(() => {
                cy.log(`Results have been written to ${filePath}`);
            });
        });
    });
});
