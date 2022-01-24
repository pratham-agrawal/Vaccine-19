import React from 'react'
import { usePosition } from 'use-position';
import PersonalForm from './form.js'

export default function FormPage() {
    const {
        latitude,
        longitude,
        speed,
        timestamp,
        accuracy,
        error,
      } = usePosition();

    return (
        <div>
            <PersonalForm latitude={latitude} longitude={longitude}></PersonalForm>
        </div>
    )
}
