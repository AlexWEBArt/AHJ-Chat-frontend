export default class SubscriptionApi {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
    
    async add(user) {
      const request = fetch(this.apiUrl + 'subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      console.log(user)
      const result = await request;
      
      if (!result.ok) {
        console.error('Ошибка');
        
        return;
      }
  
      const json = await result.json();
      const status = json.status;
      
      console.log(status);
      return status
    }
    
    async remove(user) {
      const query = 'subscriptions/' + encodeURIComponent(user);
  
      const request = fetch(this.apiUrl + query, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const result = await request;
  
      if (!result.ok) {
        console.error('Ошибка!');
        
        return;
      }
  
      const json = await result.json();
      const status = json.status;
      
      console.log(status);
    }

    async activeUser() {
      const request = fetch(this.apiUrl + 'index/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await request;
      
      if (!result.ok) {
        console.error('Ошибка');
        
        return;
      }
  
      const json = await result.json();
      const status = json.status;

      return json
    }
  }