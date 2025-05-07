import { useState, useEffect } from 'react';
import './CommissionForm.css';

function CommissionForm() {
  const [commissionType, setCommissionType] = useState('');
  const [commissionDescription, setCommissionDescription] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [contactEmail, setContactEmail] = useState('');
  const [contactDiscord, setContactDiscord] = useState('');
  const [contactOther, setContactOther] = useState('');
  const [commissionBudget, setCommissionBudget] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [minecraftType, setMinecraftType] = useState('');
  
  // Reset message visibility after success/error
  useEffect(() => {
    let timer;
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      timer = setTimeout(() => {
        setSubmissionStatus('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [submissionStatus]);
  
  const handleCommissionSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    
    // Determine which contact info to use
    let contactInfo = '';
    if (contactMethod === 'email') {
      contactInfo = contactEmail;
    } else if (contactMethod === 'discord') {
      contactInfo = contactDiscord;
    } else if (contactMethod === 'other') {
      contactInfo = contactOther;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/commission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: commissionType,
          description: commissionDescription,
          contactMethod: contactMethod,
          contactInfo: contactInfo,
          budget: commissionBudget,
          minecraftType: commissionType === 'Minecraft' ? minecraftType : null
        }),
      });
      
      if (response.ok) {
        setSubmissionStatus('success');
        // Reset form
        setCommissionType('');
        setCommissionDescription('');
        setContactMethod('email');
        setContactEmail('');
        setContactDiscord('');
        setContactOther('');
        setCommissionBudget('');
        setMinecraftType('');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting commission:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <form className="commission-form" onSubmit={handleCommissionSubmit}>
      <div className="form-group">
        <label htmlFor="commission-type">Type of Commission</label>
        <select 
          id="commission-type" 
          value={commissionType} 
          onChange={(e) => setCommissionType(e.target.value)}
          required
        >
          <option value="">Select a type</option>
          <option value="Minecraft">Minecraft Development</option>
          <option value="Discord Bot">Discord Bot</option>
          <option value="Web Development">Web Development</option>
          <option value="Game Development">Game Development</option>
          <option value="FRC Robotics">FRC Robotics</option>
          <option value="Custom Language">Custom Language Development</option>
          <option value="Other">Other (specify in description)</option>
        </select>
      </div>
      
      {commissionType === 'Minecraft' && (
        <div className="form-group conditional-field fade-in">
          <h4>Minecraft Development Type</h4>
          <div className="radio-group">
            <label className="radio-option">
              <input 
                type="radio" 
                name="minecraft-type" 
                value="Plugin" 
                checked={minecraftType === 'Plugin'} 
                onChange={() => setMinecraftType('Plugin')}
                required
              />
              Plugin
            </label>
            <label className="radio-option">
              <input 
                type="radio" 
                name="minecraft-type" 
                value="Mod" 
                checked={minecraftType === 'Mod'} 
                onChange={() => setMinecraftType('Mod')}
                required
              />
              Mod
            </label>
          </div>
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="commission-description">Project Description</label>
        <textarea 
          id="commission-description" 
          value={commissionDescription} 
          onChange={(e) => setCommissionDescription(e.target.value)}
          placeholder="Describe your project in detail..."
          required
          rows="4"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="contact-method">Preferred Contact Method</label>
        <select 
          id="contact-method" 
          value={contactMethod} 
          onChange={(e) => setContactMethod(e.target.value)}
          required
        >
          <option value="email">Email</option>
          <option value="discord">Discord</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      {contactMethod === 'email' && (
        <div className="form-group fade-in">
          <label htmlFor="contact-email">Email Address</label>
          <input 
            type="email" 
            id="contact-email" 
            value={contactEmail} 
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>
      )}
      
      {contactMethod === 'discord' && (
        <div className="form-group fade-in">
          <label htmlFor="contact-discord">Discord Username</label>
          <input 
            type="text" 
            id="contact-discord" 
            value={contactDiscord} 
            onChange={(e) => setContactDiscord(e.target.value)}
            placeholder="username#0000 or username"
            required
          />
        </div>
      )}
      
      {contactMethod === 'other' && (
        <div className="form-group fade-in">
          <label htmlFor="contact-other">Contact Information</label>
          <input 
            type="text" 
            id="contact-other" 
            value={contactOther} 
            onChange={(e) => setContactOther(e.target.value)}
            placeholder="How can I reach you?"
            required
          />
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="commission-budget">Budget (USD)</label>
        <input 
          type="text" 
          id="commission-budget" 
          value={commissionBudget} 
          onChange={(e) => setCommissionBudget(e.target.value)}
          placeholder="Your budget for this project"
          required
        />
      </div>
      
      <div className="form-submit-container">
        <button 
          type="submit" 
          className="commission-submit-btn" 
          disabled={submissionStatus === 'submitting'}
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
        </button>
        
        <div className={`progress-container ${submissionStatus ? 'active' : ''}`}>
          <div className={`progress-bar ${submissionStatus}`}>
            <div className="progress-text">
              {submissionStatus === 'submitting' && 'Submitting...'}
              {submissionStatus === 'success' && 'Success!'}
              {submissionStatus === 'error' && 'Error!'}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`submission-message ${submissionStatus === 'success' || submissionStatus === 'error' ? 'active' : ''} ${submissionStatus}`}>
        {submissionStatus === 'success' && 'Your commission request has been submitted successfully! I\'ll get back to you soon.'}
        {submissionStatus === 'error' && 'There was an error submitting your request. Please try again or contact me directly.'}
      </div>
    </form>
  );
}

export default CommissionForm;