// pages/support.js - Support Page

function loadSupportPage() {
    document.getElementById('supportContent').innerHTML = `
        <div class="card">
            <h2 class="card-title">Support Center</h2>
            
            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Contact Information</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-phone" style="color: #06b6d4; font-size: 20px;"></i>
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-envelope" style="color: #06b6d4; font-size: 20px;"></i>
                        <span>support@expensio.com</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-clock" style="color: #06b6d4; font-size: 20px;"></i>
                        <span>Monday - Friday, 9:00 AM - 6:00 PM EST</span>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Send us a message</h3>
                <div style="display: grid; gap: 16px;">
                    <div class="form-group">
                        <label>Subject</label>
                        <input type="text" id="supportSubject" placeholder="What do you need help with?">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="supportCategory">
                            <option>Technical Issue</option>
                            <option>Billing Question</option>
                            <option>Feature Request</option>
                            <option>Account Problem</option>
                            <option>General Inquiry</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea id="supportMessage" rows="6" placeholder="Describe your issue or question in detail..."></textarea>
                    </div>
                    <button class="btn-primary" onclick="sendSupportMessage()" style="width: auto;">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                </div>
            </div>

            <div>
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Frequently Asked Questions</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="padding: 16px; background: #374151; border-radius: 8px;">
                        <h4 style="font-weight: 600; margin-bottom: 8px;">How do I submit an expense?</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Click on the "Add Expense" button on the Expenses page, fill in the required details including subject, category, amount, and date, then submit.</p>
                    </div>
                    
                    <div style="padding: 16px; background: #374151; border-radius: 8px;">
                        <h4 style="font-weight: 600; margin-bottom: 8px;">How long does approval take?</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Most expenses are reviewed within 24-48 hours. You'll receive a notification once your expense has been processed.</p>
                    </div>
                    
                    <div style="padding: 16px; background: #374151; border-radius: 8px;">
                        <h4 style="font-weight: 600; margin-bottom: 8px;">Can I edit a submitted expense?</h4>
                        <p style="color: #9ca3af; font-size: 14px;">You can delete and resubmit expenses that are in "Pending" status. Hover over the expense row to see the delete option.</p>
                    </div>
                    
                    <div style="padding: 16px; background: #374151; border-radius: 8px;">
                        <h4 style="font-weight: 600; margin-bottom: 8px;">How do I plan a business trip?</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Go to the Trips page and click "Plan New Trip". Enter the destination, purpose, dates, and budget to create your trip plan.</p>
                    </div>

                    <div style="padding: 16px; background: #374151; border-radius: 8px;">
                        <h4 style="font-weight: 600; margin-bottom: 8px;">How do I update my profile information?</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Navigate to Settings from the sidebar menu. You can update your personal information, company details, and preferences there.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function sendSupportMessage() {
    const subject = document.getElementById('supportSubject').value;
    const message = document.getElementById('supportMessage').value;
    
    if (subject && message) {
        alert('Your message has been sent! Our support team will respond within 24 hours.');
        document.getElementById('supportSubject').value = '';
        document.getElementById('supportMessage').value = '';
    } else {
        alert('Please fill in both subject and message fields.');
    }
}