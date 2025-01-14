﻿using System;
using System.Collections.Generic;

namespace WebAPI_Nwind.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            Movements = new HashSet<Movement>();
            Products = new HashSet<Product>();
        }

        public int SupplierId { get; set; }
        public string CompanyName { get; set; } = null!;
        public string? ContactName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string? Phone { get; set; }
        public int CompanyId { get; set; }

        public virtual Company Company { get; set; } = null!;
        public virtual ICollection<Movement> Movements { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
