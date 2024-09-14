import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

export default function HelloWorld() {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedOption) {
            console.log('Selected Option:', selectedOption);
        } else {
            console.log('Please select an option.');
        }
    };

    return (
        <Container className="mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formSelect">
                    <Form.Label>Select an option</Form.Label>
                    <Form.Select value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled hidden>Select an option...</option> {/* Placeholder-like option */}
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
