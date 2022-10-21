import React,{Component} from 'react';

export class DonationForm extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`http://20.169.81.116:5199/api/Donation?userID=1&fundraiserID=500&donationAmount=2.00&paymentID=1&notes=another%20test&streetAddress=1234%20Forest%20Hills%20Drive&city=Los%20Angeles&zipcode=7070&country=United%20States&phone=8153424545&emailAddress=jcole%40atlantarecords.com`) {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                DepartmentId: null,
                DepartmentName: event.target.DepartmentName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
            (error) => {
                alert('Failed');
            })
    }
}